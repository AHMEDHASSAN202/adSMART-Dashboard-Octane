<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\Role;
use App\Http\Requests\Dashboard\CreateNewRoleRequest;
use App\Http\Requests\Dashboard\UpdateRoleRequest;
use App\Repositories\RolesRepository;
use Inertia\Inertia;

class RolesController extends Controller
{
    private $rolesRepository;
    private $activeId = 'roles';

    public function __construct(RolesRepository $rolesRepository)
    {
        $this->rolesRepository = $rolesRepository;
    }

    public function index()
    {
        app('document')->setTitle(_e('roles'));

        $roles = $this->rolesRepository->getRoles();
        $activeId = $this->activeId;

        return Inertia::render('Roles/Index', compact('roles', 'activeId'));
    }

    public function create()
    {
        app('document')->setTitle(_e('new_role'));
        $permissions = getAllPermissions();
        $activeId = $this->activeId;

        return Inertia::render('Roles/CreateEdit', compact('permissions', 'activeId'));
    }

    public function store(CreateNewRoleRequest $createNewRoleRequest)
    {
        $result = $this->rolesRepository->addNewRole($createNewRoleRequest->all());

        return redirect()->route('dashboard.roles.index')->with(alertFromStatus($result));
    }

    public function edit(Role $role)
    {
        app('document')->setTitle(_e(['edit', 'role']));

        $result = $this->rolesRepository->getRole($role);
        $permissions = getAllPermissions();

        return Inertia::render('Roles/CreateEdit', ['role' => $result, 'permissions' => $permissions, 'activeId' => $this->activeId]);
    }

    public function update(Role $role, UpdateRoleRequest $updateRoleRequest)
    {
        $this->rolesRepository->updateRole($role->role_id, $updateRoleRequest->all());

        return redirect()->route('dashboard.roles.index')->with(alertFromStatus(true));
    }

    public function destroy(Request $request)
    {
        $this->rolesRepository->deleteRoles($request->ids);

        return redirect()->route('dashboard.roles.index')->with(alertFromStatus(true));
    }
}
