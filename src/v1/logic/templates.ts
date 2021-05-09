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



export function createEmailContent(template_id: number, params: {[key: string]: string}) {
    return {
        subject: "Mã xác minh (OTP)",
        text: templateTextMap[template_id](params),
    }
}