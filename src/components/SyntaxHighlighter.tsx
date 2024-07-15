import { PrismLight } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism'

PrismLight.registerLanguage('javascript', js)

type Props = {
  code: string
}

export default function SyntaxHighlighter({ code }: Props) {
  return (
    <PrismLight language='javascript' style={darcula} wrapLongLines>
      {code}
    </PrismLight>
  )
}
