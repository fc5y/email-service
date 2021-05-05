const template_1 = 10001;

var templateMap: any[] = [];

templateMap[template_1] = (params: {[key: string]: string}) => {
    return `
        Chào bạn ${params.displayed_name}, 
        
        Mã xác minh của bạn là ${params.otp}. 

        Thân mến,  
        Free Contest. 
    `
}


export function createText(template_id: number, params: {[key: string]: string}) {
    return templateMap[template_id](params);
}
