import { SignInWithLens, Size, Tokens } from "@lens-protocol/widgets-react"

const SignInComponent = ({ onSignIn }: { onSignIn: (tokens: Tokens, profile: any) => void }) => {
  return (
    <SignInWithLens
      title="Lens Connect"
      size={Size.large}
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
      onSignIn={onSignIn}
    />
  )
}

export default SignInComponent
