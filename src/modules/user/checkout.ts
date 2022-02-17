export function checkoutRules(str: string){
    if(str.length < 6 || str.length > 18){
      return false;
    }
    return true;
  }