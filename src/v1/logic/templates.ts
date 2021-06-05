type Template = {
  subject: string;
  content: string;
};

const fillTemplate = function (templateString: any, templateVars: any) {
  return new Function("return `" + templateString + "`;").call(templateVars);
};

const TEMPLATES: Record<number, Template> = {
  10001: {
    subject: "Mã xác minh (OTP)",
    content:
      "" +
      "Chào bạn ${this.displayed_name}, \n" +
      "\n" +
      "Mã xác minh của bạn là: ${this.otp}. \n" +
      "\n" +
      "Thân mến, \n" +
      "FreeContest.",
  },
};

export function createEmailContent(
  template_id: number,
  params: { [key: string]: string }
) {
  return {
    subject: fillTemplate(TEMPLATES[template_id].subject, params),
    content: fillTemplate(TEMPLATES[template_id].content, params),
  };
}
