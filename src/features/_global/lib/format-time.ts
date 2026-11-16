export function formatTime(date: Date, withTime: boolean = true): string {
  const minutes = new Date(date).getMinutes().toString().padStart(2, "0");
  const hours = new Date(date).getHours().toString().padStart(2, "0");
  const month = new Date(date).toLocaleString("id-ID", { month: "long" });
  const year = new Date(date).getFullYear();
  const getDate = new Date(date).getDate();

  return `${getDate} ${month} ${year}${
    withTime ? `, ${hours}:${minutes}` : ""
  }`;
}
