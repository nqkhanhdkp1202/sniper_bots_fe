import './chart.scss'

export default function TokenChart({ tokenAddress }) {
  return (
    <div id="dexscreener-embed">
      <iframe src="https://dexscreener.com/bsc/0x16b9a82891338f9ba80e2d6970fdda79d1eb0dae?embed=1&theme=dark"></iframe>
    </div>
  )
}
