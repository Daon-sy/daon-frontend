import React from "react"
import TitleDialog from "components/common/TitleDialog"
import {
  MessageParticipantProfile,
  MessageSummary,
  WorkspaceParticipant,
} from "_types/workspace"
import { getWorkspaceStore } from "store/userStore"
import MessageListSection from "../MessageListSection"
import SendMessageSection from "../SendMessageSection"
import ReadMessageSection from "../ReadMessageSection"

interface MessageBoxProps {
  open: boolean
  handleClose: () => void
  category?: string
  receiver?: WorkspaceParticipant | undefined | null
}

const MessageBoxModal = ({
  open = false,
  handleClose,
  category,
  receiver,
}: MessageBoxProps) => {
  const { workspace } = getWorkspaceStore()

  const MESSAGE_LIST = "MessageList"
  const SEND_MESSAGE = "SendMessage"
  const READ_MESSAGE = "ReadMessage"
  const [sectionCase, setSectionCase] = React.useState<string | null>(
    MESSAGE_LIST,
  )
  const [message, setMessage] = React.useState<MessageSummary | null>(null)
  const [isSend, setIsSend] = React.useState<boolean>(false)
  const [fromReadSection, setFromReadSection] = React.useState<boolean>(false)
  const [messageSender, setMessageSender] =
    React.useState<MessageParticipantProfile | null>(null)
  const [messageReceiver, setMessageReceiver] = React.useState<
    WorkspaceParticipant | undefined | null
  >(receiver)

  React.useEffect(() => {
    if (category) {
      setSectionCase(category)
    }
  }, [])

  const handleSendMessageClick = () => {
    setMessageSender(null)
    setMessageReceiver(null)
    setSectionCase(SEND_MESSAGE)
  }

  const handleBackButtonClick = () => {
    if (fromReadSection) {
      setSectionCase(READ_MESSAGE)
      setFromReadSection(false)
    } else {
      setSectionCase(MESSAGE_LIST)
    }
  }

  const handleReadMessageReplyClick = (sender: MessageParticipantProfile) => {
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
            onSendMessageClick={handleSendMessageClick}
            onReadMessageClick={(msg, send) => {
              setSectionCase(READ_MESSAGE)
              setMessage(msg)
              setIsSend(send)
            }}
          />
        )
      case SEND_MESSAGE:
        return (
          <SendMessageSection
            onBackButtonClick={handleBackButtonClick}
            messageSender={messageSender}
            messageReceiver={messageReceiver}
          />
        )
      case READ_MESSAGE:
        return (
          <ReadMessageSection
            workspaceId={workspace?.workspaceId}
            message={message}
            isSend={isSend}
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
      color="lightGray"
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
