export function validatorCpfCnpj(val: any) {
  if (val.length === 14) {
    let cpf = val.trim();

    cpf = cpf.replace(/\./g, "");
    cpf = cpf.replace("-", "");
    cpf = cpf.split("");

    let v1 = 0;
    let v2 = 0;
    let aux = false;

    for (let i = 1; cpf.length > i; i++) {
      if (cpf[i - 1] !== cpf[i]) {
        aux = true;
      }
    }

    if (!aux) {
      return false;
    }

    for (let i = 0, p = 10; cpf.length - 2 > i; i++, p--) {
      v1 += cpf[i] * p;
    }

    v1 = (v1 * 10) % 11;

    if (Number(v1) === 10) {
      v1 = 0;
    }

    if (Number(v1) !== Number(cpf[9])) {
      return false;
    }

    for (let i = 0, p = 11; cpf.length - 1 > i; i++, p--) {
      v2 += cpf[i] * p;
    }

    v2 = (v2 * 10) % 11;

    if (Number(v2) === 10) {
      v2 = 0;
    }

    if (Number(v2) !== Number(cpf[10])) {
      return false;
    } else {
      return true;
    }
  } else if (val.length === 18) {
    let cnpj = val.trim();

    cnpj = cnpj.replace(/\./g, "");
    cnpj = cnpj.replace("-", "");
    cnpj = cnpj.replace("/", "");
    cnpj = cnpj.split("");

    let v1 = 0;
    let v2 = 0;
    let aux = false;

    for (let i = 1; cnpj.length > i; i++) {
      if (Number(cnpj[i - 1]) !== Number(cnpj[i])) {
        aux = true;
      }
    }

    if (!aux) {
      return false;
    }

    for (let i = 0, p1 = 5, p2 = 13; cnpj.length - 2 > i; i++, p1--, p2--) {
      if (Number(p1) >= 2) {
        v1 += cnpj[i] * p1;
      } else {
        v1 += cnpj[i] * p2;
      }
    }

    v1 = v1 % 11;

    if (Number(v1) < 2) {
      v1 = 0;
    } else {
      v1 = 11 - v1;
    }

    if (Number(v1) !== Number(cnpj[12])) {
      return false;
    }

    for (let i = 0, p1 = 6, p2 = 14; cnpj.length - 1 > i; i++, p1--, p2--) {
      if (Number(p1) >= 2) {
        v2 += cnpj[i] * p1;
      } else {
        v2 += cnpj[i] * p2;
      }
    }

    v2 = v2 % 11;

    if (Number(v2) < 2) {
      v2 = 0;
    } else {
      v2 = 11 - v2;
    }

    if (Number(v2) !== Number(cnpj[13])) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
