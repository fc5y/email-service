type Template = {
  subject: string;
  content: string;
};

const TEMPLATES: Record<number, Template> = {
  10001: {
    subject: "Mã xác minh (OTP)",
    content:
      "" +
      "Chào bạn {{displayed_name}}, \n" +
      "\n" +
      "Mã xác minh của bạn là: {{otp}}. \n" +
      "\n" +
      "Thân mến, \n" +
      "FreeContest.",
  },
};

function fillString( currentString: string, params: { [key: string]: string } ) {
  return currentString.replace( /\{\{[^}]+\}\}/g, (match) => {
    const key = match.slice(2, -1).trim(); 
    return params.hasOwnProperty(key) ?  params[key] : match;
  })
}

export function createEmailContent(
  template_id: number,
  params: { [key: string]: string }
) {
  const currentTemplate = TEMPLATES[template_id];
  return {
    subject: fillString(currentTemplate.subject, params),
    content: fillString(currentTemplate.content, params),
  }
}
