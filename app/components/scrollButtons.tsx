
export interface ScrollProps{
    showTopButton: boolean,
    scrollToTop: () => void,
    showBottomButton: boolean,
    scrollToBottom: () => void
}

export default function ScrollButtons({showTopButton, scrollToTop, showBottomButton, scrollToBottom}: ScrollProps) {
  return (
    <>
          {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 z-50 bg-blue-500 text-white dark:bg-orange-500 p-2 rounded-full shadow-lg cursor-pointer  hover:opacity-90" 
        >
          ↑ Top
        </button>
      )}

      {showBottomButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-5 right-5 z-50 bg-blue-500 text-white dark:bg-orange-500 p-2 rounded-full shadow-lg cursor-pointer  hover:opacity-90"
        >
          ↓ Bottom
        </button>
      )}
    </>
  )
}
