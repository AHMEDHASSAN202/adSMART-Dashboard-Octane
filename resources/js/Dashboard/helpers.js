import {GET_MESSAGES_CHAT_URL} from "./Constants";
import MomentComponent from "./Components/MomentComponent";
import moment from "moment";

export const formBuilder = (languages, formInputs={}, translatableInputs=[]) => {
    let keys = Object.keys(formInputs);
    let formBuilder = {};
    keys.map((input) => {
        if (!translatableInputs.includes(input)) {
            formBuilder[input] = formInputs[input];
        }else {
            formBuilder[input] = {};
            languages.map((lang) => {
                formBuilder[input][lang.language_code] = formInputs[input];
            });
        }
    })
    return formBuilder;
}

export const getLanguagesTabs = (languages) => {
    const tabs = languages.map((lang) => {
        return {id: lang.language_code, title: lang.language_name};
    });

    return tabs;
}

export const getFromObject = (obj, el, defaultValue='') => {
    return myIf(obj, el, obj[el], defaultValue)
}

export const myIf = (obj, el, trueValue, falseValue) => {
    return obj[el] ? trueValue : falseValue;
}

export const handleOptions = (options) => {
    let ops = {};
    options.map((option) => {
        ops[option.option_key] = option.option_value;
    })
    return ops;
}

export const successAlert = {
    class: 'info',
    icon: 'flaticon-like',
    title: translations['success_message']
}

export const dangerAlert = {
    class: 'danger',
    icon: 'flaticon-warning',
    title: translations['error_message']
}

export const assets = (url) => {
    return `/storage/${url}`;
}

function timeSinceFromNow(date) {

    if (date == '' || date == null) return '';

    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years";
    }

    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }

    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }

    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }

    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }

    return Math.floor(seconds) + " seconds";
}

export const isTrue = (value) => {
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}

export const generateSlug = (text) => {
    return text.toLowerCase().replace(/([^أ-يA-Za-z0-9]|-)+/g,'-').replace(/ +/g,'-');
}

export const isEmptyObject = (object) => {
    return Object.keys(object).length == 0;
}

export const compareTwoArray = (array1, array2) => {
    if (array1.length !== array2.length) {
        return false;
    }
    return array1.sort().join(',') === array2.sort().join(',');
}

export const getParents = (el, parentSelector) => {
    var parents = [];
    var p = el?.parentNode;
    while (p) {
        if (p == document) break;
        if (p.classList.contains(parentSelector)) {
            parents.push(p);
        }
        p = p.parentNode;
    }
    return parents;
}

export class ChatItem {
    constructor(item, user_token, user_id) {
        this.randomId = '';
        this.title = '';
        this.subTitle = '';
        this.imageComponent = '';
        this.text = '';
        this.chat = [];
        this.messagesUrl = '';
        this.created_by = '';
        this.created_by_name = '';
        this.isGroup = false;
        this.isMyGroup = false;
        this.isUser = false;
        this.span = '';
        this.id = '';
        this.identify = '';

        switch (item.model_type) {
            case 'user' :
                this.title = item.user_name;
                this.span = item.name;
                this.subTitle = item.user_email;
                this.imageComponent = <img alt={this.title} src={item.user_avatar ? assets(item.user_avatar) : assets(DEFAULT_USER_AVATAR)}/>;
                this.messagesUrl = GET_MESSAGES_CHAT_URL + '?auth_token=' + user_token + '&lang=' + currentLanguage.language_id + '&user_id=' + item.user_id;
                this.id = item.user_id;
                this.isUser = true;
                this.randomId = 'user-' + item.user_id;
                this.identify = 'user_id';
                break;
            case 'group' :
                this.title = item.group_name;
                this.span = translations['group'] || 'group';
                this.subTitle = 'created by: ' + item.created_by_name;
                this.imageComponent = <span className={'symbol-label font-size-h5 font-weight-bold text-uppercase'}>{this.title[0]}</span>;
                this.messagesUrl = GET_MESSAGES_CHAT_URL + '?auth_token=' + user_token + '&lang=' + currentLanguage.language_id + '&group_id=' + item.group_id;
                this.created_by = item.fk_created_by;
                this.created_by_name = item.created_by_name;
                this.isGroup = true;
                this.id = item.group_id;
                this.identify = 'group_id';
                this.isMyGroup = (item.fk_created_by === user_id);
                this.randomId = 'group-' + item.group_id;
                break
        }
        if (item.message_id) {
            let lastMessage = new Message(item, user_id);
            this.text = lastMessage.created_at;
            this.chat.push(lastMessage);
        }
    }
}

export class Message {
    constructor(message, auth_id) {
        this.message_id = message.message_id || '';
        this.message_type = message.message_type || 'text';
        this.message_content = message.message_content || '';
        this.created_at = <MomentComponent fromNow date={moment.parseZone(message.created_at).toISOString()} />;;
        this.file_id = '';
        this.file_path = '';
        this.original_name = '';
        this.group_id = message.fk_group_id;
        this.reciever_id = message.fk_receiver_id;
        this.sender_id = message.fk_sender_id;
        this.user_name = message.user_name || '';
        this.user_avatar = message.user_avatar ? assets(message.user_avatar) : '';
        this.myMessage = (message.fk_sender_id === auth_id);
        this.isText = this.message_type === 'text';
        if (this.message_type != 'text') {
            this.file_id = message.fk_file_id || '';
            let serviceDomain = WS_SERVICE_DOMAIN.charAt(WS_SERVICE_DOMAIN.length - 1) == '/' ? WS_SERVICE_DOMAIN.slice(0, -1) : WS_SERVICE_DOMAIN;
            this.file_path = serviceDomain + assets(message.file_path);
            this.original_name = message.original_name || '';
            this.message_content = this.original_name;
        }
    }
}

export class Group {
    constructor() {
        this.group_id = null;
        this.group_name = '';
        this.members = [];
    }
}
