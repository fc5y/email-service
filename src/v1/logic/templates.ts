type Template = {
    subject: string;
    content: (params: { [key: string]: string; }) => string;
}

const TEMPLATES: Record<number,Template> = {
    10001: {
        subject: "Mã xác minh (OTP)",
        content: (params: {[key: string]: string}) => {
            return  `
                Chào bạn ${params.displayed_name}, 
        
                Mã xác minh của bạn là ${params.otp}. 
        
                Thân mến,  
                Free Contest. 
            `
        }
    }
}

export function createEmailContent(template_id: number, params: {[key: string]: string}) {
    return {
        subject: TEMPLATES[template_id].subject,
        content: TEMPLATES[template_id].content(params),
    }
}