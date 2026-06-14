export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const truncate = (str: string, length: number): string => {
  return str.length > length ? `${str.substring(0, length)}...` : str;
};
