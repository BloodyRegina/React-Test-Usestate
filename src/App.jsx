import { useState } from "react";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(10000);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [history, setHistory] = useState([]);

  const handleWithdraw = (amount) => {
    if (balance - amount < 1) {
      alert("ไม่สามารถถอนเงินเกินจำนวนที่มีอยู่ในบัญชีได้");
    } else {
      setBalance((prevBalance) => prevBalance - amount);
      setHistory([...history, { amount, remaining: balance - amount }]);
    }
  };

  const handleCustomWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
      return;
    }
    handleWithdraw(amount);
  };

  return (
    <div className="p-4">
      <div className="w-full gap-5">
        <div className="bg-white flex flex-col items-center justify-center gap-4 rounded-lg p-5 shadow-lg md:fixed">
          <h1>ระบบถอนเงิน</h1>
          <h2>ยอดเงินคงเหลือ {balance} บาท</h2>
          <div className="grid grid-cols-2 w-full gap-2">
            <button onClick={() => handleWithdraw(100)} className="w-full bg-green-200 p-3 rounded-lg">
              ถอน 100 บาท
            </button>
            <button onClick={() => handleWithdraw(500)} className="w-full bg-green-200 p-3 rounded-lg">
              ถอน 500 บาท
            </button>
            <button onClick={() => handleWithdraw(1000)} className="w-full bg-green-200 p-3 rounded-lg">
              ถอน 1,000 บาท
            </button>
            <button onClick={() => handleWithdraw(5000)} className="w-full bg-green-200 p-3 rounded-lg">
              ถอน 5,000 บาท
            </button>
          </div>
          <h3>จำนวนเงินที่ต้องการถอน</h3>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="w-full rounded-lg border-black p-2 border-[1px]"
          />
          <button onClick={handleCustomWithdraw} className="bg-blue-300 w-full rounded-lg p-3">
            ถอนเงิน
          </button>
        </div>
        <div className="bg-white shadow-lg flex flex-col items-center p-5 gap-4 rounded-lg md:w-1/2 md:ml-96">
          <h2>ประวัติการถอนเงิน</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index} className="border-b border-gray-300 w-full py-2">
                ถอน {entry.amount} บาท, ยอดคงเหลือ: {entry.remaining} บาท
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
