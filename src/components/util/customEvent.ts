
type EventHandler<EventArgs> = (args: EventArgs) => void
export class CustomEvent<EventArgs>
{
    private subscribers: Array<EventHandler<EventArgs>>
    constructor()
    {
        this.subscribers = []
    }
    Subscribe(subscriber: EventHandler<EventArgs>)
    {
        this.subscribers.push(subscriber)
    }
    async Invoke(eventArgs: EventArgs)
    {
        for (let subscriber of this.subscribers)
        {
            subscriber(eventArgs)
        }
    }
}

