const TEMPLATE = {
    TEMPLATE_ID_1: {
        subject: "Mã xác minh (OTP)",
        text: "Chào bạn {displayed_name} \n"
              + "\n"
              + "Mã xác minh của bạn là: {otp} \n"
              + "\n"
              + "Thân mến, \n"
              + "FreeContest.",
    }
}

const TEMPLATE_ID_1 = 10001;

export function createEmailContent(
    template_id: number, 
    params: {[key: string]: string}
) {
    var tmp = TEMPLATE.TEMPLATE_ID_1;
    switch (template_id)
    {
        case TEMPLATE_ID_1 : {
            tmp = TEMPLATE.TEMPLATE_ID_1;
            break;
        }
        default: {
            tmp = TEMPLATE.TEMPLATE_ID_1;
        }
    }

    tmp.text = tmp.text.replace("{displayed_name}",params.displayed_name);
    tmp.text = tmp.text.replace("{otp}",params.otp);

    return tmp;
}