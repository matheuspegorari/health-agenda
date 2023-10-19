export function inputHandleCpfCnpjChange(event: any, onChange: any) {
  // Get only the numbers from the data input
  let data = event.target.value?.replace(/\D/g, "");
  // Checking data length to define if it is cpf or cnpj
  if (data.length > 11) {
    // It's cnpj
    let cnpj = `${data.substr(0, 2)}.${data.substr(2, 3)}.${data.substr(
      5,
      3
    )}/`;
    if (data.length > 12) {
      cnpj += `${data.substr(8, 4)}-${data.substr(12, 2)}`;
    } else {
      cnpj += data.substr(8);
    }
    data = cnpj;
  } else {
    // It's cpf
    let cpf = "";
    const parts = Math.ceil(data.length / 3);
    for (let i = 0; i < parts; i++) {
      if (i === 3) {
        cpf += `-${data.substr(i * 3)}`;
        break;
      }
      cpf += `${i !== 0 ? "." : ""}${data.substr(i * 3, 3)}`;
    }
    data = cpf;
  }

  onChange(data);
}

export function inputHandleCpfChange(event: any, onChange: any) {
  // Get only the numbers from the data input
  let data = event.target.value?.replace(/\D/g, "");
  // Checking data length to define if it is cpf or cnpj
  // It's cpf
  if (data.length < 12) {
    let cpf = "";
    const parts = Math.ceil(data.length / 3);
    for (let i = 0; i < parts; i++) {
      if (i === 3) {
        cpf += `-${data.substr(i * 3)}`;
        break;
      }
      cpf += `${i !== 0 ? "." : ""}${data.substr(i * 3, 3)}`;
    }

    data = cpf;

    onChange(data);
  }
}

export function inputHandleCep(event: any, onChange: any) {
  const data = event.target.value?.replace(/\D/g, "");

  let cep = data;

  if (data.length > 5) {
    cep = `${cep.substring(0, 5)}-${cep.substring(5)}`;
  }

  if (data.length < 9) {
    onChange(cep);
  }
}

export function inputHandlePhone(event: any, onChange: any) {
  const data = event.target.value?.replace(/\D/g, "");

  let phone = data;

  phone = phone.replace(/\D/g, "");
  phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
  phone = phone.replace(/(\d)(\d{4})$/, "$1-$2");

  if (data.length < 12) {
    onChange(phone);
  }
}

export function inputHandleDate(event: any, onChange: any) {
  let data: string = event.target.value;

  if (event.nativeEvent.inputType === "deleteContentBackward") {
    onChange(data);
    return null;
  }

  if (data.match(/^\d{2}$/) !== null) {
    data = data + "/";
  } else if (data.match(/^\d{2}\/\d{2}$/) !== null) {
    data = data + "/";
  }

  if (data.length <= 10) onChange(data);
}

export function inputHandleMoney(event: any, onChange: any) {
  let data: string = event.target.value;

  data = data
    .replace(/\D/g, "")
    .replace(/(\d{1})(\d{14})$/, "$1.$2")
    .replace(/(\d{1})(\d{11})$/, "$1.$2")
    .replace(/(\d{1})(\d{8})$/, "$1.$2")
    .replace(/(\d{1})(\d{5})$/, "$1.$2")
    .replace(/(\d{1})(\d{2})$/, "$1,$2");

  onChange(data);
}
