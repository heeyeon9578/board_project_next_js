export default function handler(req, res) {
    if (req.method === "GET") {
      const now = new Date();
  
      // 날짜 및 시간 포맷팅
      const formattedDate = {
        year: now.getFullYear(), // 년
        month: now.getMonth() + 1, // 월 (0부터 시작하므로 +1)
        day: now.getDate(), // 일
        hours: now.getHours(), // 시간
        minutes: now.getMinutes(), // 분
        seconds: now.getSeconds() // 초
      };
  
      return res.status(200).json(formattedDate);
    }
  }
  