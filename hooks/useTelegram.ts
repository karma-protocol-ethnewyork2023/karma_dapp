import { useEffect, useState } from "react"

function useTelegram() {
  const [authDataTable, setAuthDataTable] = useState<any>({})
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const MTProto = require("@mtproto/core/envs/browser")
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { sleep } = require("@mtproto/core/src/utils/common")

  const tele_api_id = process.env.NEXT_PUBLIC_TELEGRAM_APP_API_ID
  const tele_api_hash = process.env.NEXT_PUBLIC_TELEGRAM_APP_API_HASH

  const mtproto = new MTProto({
    api_id: tele_api_id,
    api_hash: tele_api_hash,
  })

  mtproto.updates.on("updatesTooLong", (updateInfo: any) => {
    console.log("updatesTooLong:", updateInfo)
  })

  mtproto.updates.on("updateShortMessage", (updateInfo: any) => {
    console.log("updateShortMessage:", updateInfo)
  })

  mtproto.updates.on("updateShortChatMessage", (updateInfo: any) => {
    console.log("updateShortChatMessage:", updateInfo)
  })

  mtproto.updates.on("updateShort", (updateInfo: any) => {
    console.log("updateShort:", updateInfo)
  })

  mtproto.updates.on("updatesCombined", (updateInfo: any) => {
    console.log("updatesCombined:", updateInfo)
  })

  mtproto.updates.on("updates", (updateInfo: any) => {
    console.log("updates:", updateInfo)
  })

  mtproto.updates.on("updateShortSentMessage", (updateInfo: any) => {
    console.log("updateShortSentMessage:", updateInfo)
  })

  const call = async (method: string, params: any = {}, options = {}): Promise<any> => {
    try {
      return await mtproto.call(method, params, options)
    } catch (error) {
      console.log(error)

      const { error_code, error_message } = error as { error_code: number; error_message: string }

      if (error_code === 420) {
        const seconds = Number(error_message.split("FLOOD_WAIT_")[1])
        const ms = seconds * 1000

        await sleep(ms)

        return call(method, params, options)
      }

      if (error_code === 303) {
        const [type, dcIdAsString] = error_message.split("_MIGRATE_")

        const dcId = Number(dcIdAsString)

        // If auth.sendCode call on incorrect DC need change default DC, because
        // call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
        if (type === "PHONE") {
          await mtproto.setDefaultDc(dcId)
        } else {
          Object.assign(options, { dcId })
        }

        return call(method, params, options)
      }

      //   throw new Error(method, error as any)
    }
  }

  const getNearestDc = async () => {
    return await call("help.getNearestDc").then((nearestDc: any) => {
      console.log("nearestDc:", nearestDc.country)

      return nearestDc
    })
  }

  const authSendCode = async (phone_number: string) => {
    return await call("auth.sendCode", {
      phone_number,
      settings: {
        _: "codeSettings",
      },
    })
      .then((authSendCodeResult: any) => {
        console.log("authSendCodeResult:", authSendCodeResult)

        setAuthDataTable({
          phone_number,
          phone_code_hash: authSendCodeResult.phone_code_hash,
        })

        return authSendCodeResult
      })
      .catch((error: any) => {
        console.log("authSendCode error:", error)

        return error
      })
  }

  const authSignIn = async (code: string) => {
    return await call("auth.signIn", {
      phone_number: authDataTable.phone_number,
      phone_code_hash: authDataTable.phone_code_hash,
      phone_code: code,
    })
      .then((authSignInResult: any) => {
        console.log("authSignInResult:", authSignInResult)

        return authSignInResult
      })
      .catch((error: any) => {
        console.log("authSignIn error:", error)

        return error
      })
  }

  const getUserInfoByUsername = async (username: string) => {
    const result = await call("contacts.resolveUsername", {
      username: username,
    })
      .then((result: any) => {
        return result
      })
      .catch((error: any) => {
        console.log("getUserInfoByUsername error:", error)
        return error
      })

    // if (result._ === "contacts.resolvedPeer" && result.peer._ === "peerUser") {
    //   return result.users[0]
    // }
    // return null
  }

  return { mtproto, call, getNearestDc, authSendCode, authSignIn, getUserInfoByUsername }
}

export default useTelegram
