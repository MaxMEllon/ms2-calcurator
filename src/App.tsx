import React, { useState, useCallback } from 'react';

type Result = {
  success: boolean
  // weapon: number,
  // onyx: number,
  // kaonyx: number,
  // crystal: number,
}

const rateMap = {
  '+10': 0.4,
  '+11': 0.3,
  '+12': 0.2,
  '+13': 0.1,
  '+14': 0.05,
}

const App: React.FC = () => {
  const [result, setResult] = useState<Result[]>([])
  const onClick = useCallback((e) => {
    // @ts-ignore
    const $ = document.querySelector("select.plus").value
    if (!Object.keys(rateMap).includes($)) return
    const rate = rateMap[$ as keyof typeof rateMap]
    setResult(result.concat([{ success: Math.random() < rate }]))
  }, [result])
  const last = result.length !== 0 ? result[result.length - 1].success : false
  return (
    <div className="container">
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              エンチャント シミュレーター
            </h1>
            <h2 className="subtitle">
              Enchant Simulator
            </h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <dl style={{ paddingBottom: "10px"}}>
            <dd>TODO: 必要素材数の算出</dd>
            <dd>TODO: 異なる武器種の対応</dd>
            <dd>TODO: エンチャ時に武器を過剰に与えるかどうかを選択できるように</dd>
          </dl>
        </div>
        <div className="container">
          <h1 className="title">エンチャント対象</h1>
          <div className="field has-addons">
            <div className="control">
              <div className="select is-fullwidth">
                <select className="plus">
                  <option>選択してね</option>
                  <option>+10</option>
                  <option>+11</option>
                  <option>+12</option>
                  <option>+13</option>
                  <option>+14</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button disabled={last} onClick={onClick} type="submit" className="button is-primary">Enchant!</button>
            </div>

            <div className="control">
              <button disabled type="submit" className="button is-info">使った素材集計 (準備中)</button>
            </div>
          </div>
          {result.length !== 0 && result.map((r, idx) => (
            <span key={idx} className={`tag ${r.success ? 'is-success' : 'is-danger'}`}>{r.success ? "成功" : "失敗"}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
