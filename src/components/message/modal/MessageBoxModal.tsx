import React from "react"
import TitleDialog from "components/common/TitleDialog"
import { MessageSender, MessageSummary } from "_types/workspace"
import { getWorkspaceStore } from "store/userStore"
import MessageListSection from "../MessageListSection"
import SendMessageSection from "../SendMessageSection"
import ReadMessageSection from "../ReadMessageSection"

interface MessageBoxProps {
  open: boolean
  handleClose: () => void
  category?: string
}

const MessageBoxModal = ({
  open = false,
  handleClose,
  category,
}: MessageBoxProps) => {
  const { workspace } = getWorkspaceStore()

  const MESSAGE_LIST = "MessageList"
  const SEND_MESSAGE = "SendMessage"
  const READ_MESSAGE = "ReadMessage"
  const [sectionCase, setSectionCase] = React.useState<string | null>(
    MESSAGE_LIST,
  )
  const [message, setMessage] = React.useState<MessageSummary | null>(null)
  const [fromReadSection, setFromReadSection] = React.useState<boolean>(false)
  const [messageSender, setMessageSender] =
    React.useState<MessageSender | null>(null)

  React.useEffect(() => {
    if (category) {
      setSectionCase(category)
    }
  }, [])

  const handleBackButtonClick = () => {
    if (fromReadSection) {
      setSectionCase(READ_MESSAGE)
      setFromReadSection(false)
    } else {
      setSectionCase(MESSAGE_LIST)
    }
  }

  const handleReadMessageReplyClick = (sender: MessageSender) => {
    if (sender) {
      setFromReadSection(true)
      setSectionCase(SEND_MESSAGE)
      setMessageSender(sender)
    }
  }

  const renderSectionComponent = () => {
    switch (sectionCase) {
      case MESSAGE_LIST:
        return (
          <MessageListSection
            workspace={workspace}
            onSendMessageClick={() => setSectionCase(SEND_MESSAGE)}
            onReadMessageClick={e => {
              setSectionCase(READ_MESSAGE)
              setMessage(e)
            }}
          />
        )
      case SEND_MESSAGE:
        return (
          <SendMessageSection
            onBackButtonClick={handleBackButtonClick}
            messageSender={messageSender}
          />
        )
      case READ_MESSAGE:
        return (
          <ReadMessageSection
            workspaceId={workspace?.workspaceId}
            message={message}
            onBackButtonClick={handleBackButtonClick}
            onReplyClick={handleReadMessageReplyClick}
          />
        )
      default:
        return null
    }
  }

  return (
    <TitleDialog
      maxWidth="xs"
      height={600}
      handleClose={handleClose}
      open={open}
    >
      {renderSectionComponent()}
    </TitleDialog>
  )
}

export default MessageBoxModal
