type Template = {
  subject: string;
  content: string;
};

const TEMPLATES: Record<number, Template> = {
    10001: {
      subject: "{{otp}} là mã xác minh Free Contest của bạn.",
      content:
        "" +
        "Chào bạn {{displayed_name}}, \n" +
        "\n" +
        "Bạn đang tạo một tài khoản Free Contest. \n" +
        "Mã xác minh của bạn là: {{otp}}. \n" +
        "Mã này có hiệu lực trong 10 phút. \n" +
        "\n" +
        "Thân mến, \n" +
        "FreeContest.",
    },
    10002: {
      subject: "{{otp}} là mã xác minh Free Contest của bạn.",
      content:
      "" +
        "Chào bạn {{displayed_name}}, \n" +
        "\n" +
        "Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản {{username}}. \n" +
        "Mã xác minh của bạn là: {{otp}}. \n" +
        "Mã này có hiệu lực trong 10 phút. \n" +
        "\n" +
        "Thân mến, \n" +
        "FreeContest.",
    }
};

function fillString(currentString: string, params: { [key: string]: string }) {
  return currentString.replace(/\{\{[^}]+\}\}/g, (match) => {
    const key = match.slice(2, -2).trim();
    return params.hasOwnProperty(key) ? params[key] : match;
  });
}

export function createEmailContent(template_id: number, params: { [key: string]: string }) {
  const currentTemplate = TEMPLATES[template_id];
  return {
    subject: fillString(currentTemplate.subject, params),
    content: fillString(currentTemplate.content, params),
  };
}
