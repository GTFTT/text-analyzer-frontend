import styles from "./ExistingProjectChat.module.css";
import Input from "../../components/inputs/Input/Input.tsx";
import Button from "../../components/buttons/Button/Button.tsx";
import {Wizard} from "../../components/Wizard/Wizard.tsx";
import {useExistingProjectChat} from "./useExistingProjectChat.ts";

export function ExistingProjectChat() {
  const {
    parsedProjectId,
    currentProjectId,
    currentProjectName,
    chatHistory,
    query,
    errorMessage,
    isWaitingForResponse,
    isChatHistoryLoading,
    isDeletingChatHistory,
    isDeleteHistoryDisabled,
    isSubmitDisabled,
    onQueryChange,
    onDeleteHistoryClick,
    onSubmit,
  } = useExistingProjectChat();

  if (parsedProjectId === null) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>Invalid project id in URL.</p>
      </div>
    );
  }

  if (currentProjectId === null) {
    return (
      <div className={styles.container}>
        <p className={styles.info}>Loading project chat...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Wizard items={['Projects', 'Chat in '+ currentProjectName]} />
        <p className={styles.subtitle}>
          {currentProjectName ?? "Selected project"} (ID: {currentProjectId})
        </p>
        <div className={styles.actionsRow}>
          <Button
            type="button"
            onClick={onDeleteHistoryClick}
            disabled={isDeleteHistoryDisabled}
          >
            {isDeletingChatHistory ? "Deleting history..." : "Delete chat history"}
          </Button>
        </div>
      </div>

      <div className={styles.messages}>
        {chatHistory.length === 0 ? (
          <p className={styles.info}>Ask your first question about this project.</p>
        ) : (
          chatHistory.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${
                message.role === "user" ? styles.userMessage : styles.assistantMessage
              }`}
            >
              <p className={styles.messageRole}>{message.role === "user" ? "You" : "Assistant"}</p>
              {message.bestTexts !== undefined? <div className={styles.messageContextContainer}>{message.bestTexts.map((bt, index) => {
                return (
                  <div key={index}>
                    <p className={styles.messageContextText}>{bt}</p>
                  </div>
                )
              })}</div>: ""}
              <p className={styles.messageText}>{message.text}</p>
            </div>
          ))
        )}
      </div>

      {isChatHistoryLoading && <p className={styles.info}>Loading latest chat history...</p>}
      {isWaitingForResponse && <p className={styles.info}>Waiting for assistant response...</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          placeholder="Ask a question about this project..."
          value={query}
          disabled={isWaitingForResponse || isChatHistoryLoading}
          onChange={onQueryChange}
        />
        <Button type="submit" disabled={isSubmitDisabled}>
          {isWaitingForResponse ? "Asking..." : "Ask"}
        </Button>
      </form>
    </div>
  );
}


