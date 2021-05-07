import { TEMPLATES} from "../constants/templates"
const TEMPLATE_ID_1 = 10001;

export function createEmailContent(
    template_id: number, 
    params: {[key: string]: string}
) {
    var tmp = TEMPLATES.TEMPLATE_ID_1;
    switch (template_id)
    {
        case TEMPLATE_ID_1 : {
            tmp = TEMPLATES.TEMPLATE_ID_1;
            break;
        }
        default: {
            tmp = TEMPLATES.TEMPLATE_ID_1;
        }
    }

    tmp.text = tmp.text.replace("{displayed_name}",params.displayed_name);
    tmp.text = tmp.text.replace("{otp}",params.otp);

    return tmp;
}