
type EventHandler<EventArgs> = (args: EventArgs) => void
export class CustomEvent<EventArgs>
{
    private subscribers: Array<EventHandler<EventArgs>> = []
    Subscribe(subscriber: EventHandler<EventArgs>)
    {
        this.subscribers.push(subscriber)
    }
    async Invoke(eventArgs: EventArgs)
    {
        this.subscribers.forEach(subscriber => {
            subscriber(eventArgs)
        })
    }
}

