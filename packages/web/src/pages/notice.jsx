import '../App.css'

function Notice() {
    return (
        <>
        <div>
            <img src="/irc-anywhere.png" className="logo react" alt="React logo" />
        </div>
        <h1>Cease to Desist Order</h1>
        <h2>IRC Anywhere</h2>

        <div className="notice">
            Due to traffic irregularity, we have decided to cease operations of IRC Anywhere. We are sorry for any inconvenience this may cause. If you have any questions, please contact us at <a href="mailto:noreply@noreply.ctf">noreply@noreply.ctf</a>.

            All data will be deleted in 30 days.

            Registration is now closed. If you have an account, you can still log in to view your messages.
        </div>
        </>
    )
}

export default Notice;
