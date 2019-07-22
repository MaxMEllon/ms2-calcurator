import React, { useState, useCallback, useEffect } from 'react';
import img from "../img/formla.png"

function fn(rate: number, count: number): number  {
  if (count === 0) return 0
  if (count === 1) return rate
  return Math.pow(1 - rate, count - 1) * rate + fn(rate, count - 1)
}

const Calcurator: React.FC = () => {
  const [rate, setRate] = useState(0)
  const [count, setCount] = useState(0)
  const [result, setResult] = useState(0)
  const onChangeRate = useCallback((e) => {
    let r = parseInt(e.target.value, 10)
    if (isNaN(r)) return
    if (r > 100) r = 100
    if (r < 0) r = 0
    setRate(r)
  }, [])
  const onChangeCount = useCallback((e) => {
    let c = parseInt(e.target.value, 10)
    if (200 < c) return
    if (isNaN(c)) return
    if (c < 0) c = 0
    setCount(c)
  }, [])
  useEffect(() => {
    setResult(fn(rate / 100, count))
  }, [rate, count])
  return (
    <div className="container">
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              エンチャント計算機
            </h1>
            <h2 className="subtitle">
              Enchant Calcurator
            </h2>
          </div>
        </div>
      </section>
      <section className="section">
        <dl>
          <dt>確率の求め方</dt>
          <dd>1回のとき: そのままの確率</dd>
          <dd>2回のとき: 1回目成功したとき + (1回目失敗する確率 * 2回目成功する確率)</dd>
          <dd>3回のとき: 1回目成功したとき + (1回目失敗する確率 * 2回目失敗する確率) + (1回目失敗する確率 * 2回目失敗する確率 * 3回目成功する確率)</dd>
          <p>これを漸化式にすると</p>
        </dl>
        <img alt="formla" src={img} />
        <p>となる</p>
        <div style={wrapper} className="m-wrap">
          <span>エンチャント成功確率が</span>
          <input onChange={onChangeRate} value={rate} style={input} className="input" type="number" />
          <span>% のとき</span>
          <input onChange={onChangeCount} value={count} style={input} className="input" type="number" />
          <span>回 試行すると</span>
          <span>{Math.round(result * 100000) / 1000}</span>
          <span>% でエンチャに成功する</span>
        </div>
      </section>
    </div>
  );
}

export default Calcurator;


const wrapper = {
  lineHeight: "40px",
  height: "40px",
}

const input = {
  width: "80px",
  display: "inline",
  lineHeight: "0",
  marginLeft: "15px",
  marginRight: "15px",
}
