import { FollowOnLens, Size, Theme } from "@lens-protocol/widgets-react"

const FollowOnLensComponent = ({ handle }: { handle: string }) => {
  return (
    <FollowOnLens
      handle={handle}
      size={Size.large}
      theme={Theme.light}
      containerStyle={{
        width: "335px",
        height: "54px",
        borderRadius: "27px",
        backgroundColor: "#FFEBB8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 17px",
        marginTop: "12px",
      }}
      textStyle={{
        fontFamily: "sans",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#282E29",
      }}
      iconForegroundColor="white"
      iconBackgroundColor="black"
    />
  )
}

export default FollowOnLensComponent
