const TEMPLATE_1 = 10001;

var templateTextMap: any[] = [];

templateTextMap[TEMPLATE_1] = (params: {[key: string]: string}) => {
    return  `
        Chào bạn ${params.displayed_name}, 

        Mã xác minh của bạn là ${params.otp}. 

        Thân mến,  
        Free Contest. 
    `
}

var templateSubjectMap: string[] = [];

templateSubjectMap[TEMPLATE_1] = "Mã xác minh (OTP)";

export function createEmailContent(template_id: number, params: {[key: string]: string}) {
    return {
        subject: templateSubjectMap[template_id],
        text: templateTextMap[template_id](params),
    }
}