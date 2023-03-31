import { useLog } from '../../contexts/logger.context'

export default function Logger() {
  const { logContent } = useLog()
  const renderContent = logContent.map((c, i) => (
    <li
      className={`p-0 m-0 text-${c.textColor}`}
      style={{ fontSize: '14px', fontWeight: 600 }}
      key={i}
    >
      {c.content}
    </li>
  ))
  return renderContent
}
