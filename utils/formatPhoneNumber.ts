const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, ''); // Loại bỏ tất cả ký tự không phải số
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };
export default formatPhoneNumber;