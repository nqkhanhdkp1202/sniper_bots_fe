import { useLog } from '../../contexts/logger.context'

export default function Logger() {
  const { logContent } = useLog()
  const renderContent = logContent.map((c, i) => (
    <li className="p-0 m-0 text-dark" style={{ fontSize: '18px' }} key={i}>
      {c}
    </li>
  ))
  return renderContent
}
