import { useState } from "react"

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace=false) => {
    if(replace) {
      const newHistory = [...history];
      newHistory.pop();

      setHistory(() => [...newHistory, newMode]);
      setMode(newMode);
    } else {
      setHistory(prev => [...prev, newMode]);
      
      setMode(newMode);
    }
    
  }
  const back = () => {
    if (history.length <= 1) {
      setMode(initial);
    } else {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  }
  return {mode, transition, back}
}



