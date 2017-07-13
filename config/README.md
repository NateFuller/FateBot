# ./config/
The items that exist in this folder should be used for simple access in your implementation of the bot. You'll see that
I've included 3 .json files. These files are necessary in my implementation by default, so if you decide to make
changes, make sure you account for those in the codebase or else you'll get compiler errors.
## constants.json
A generic json file keeping track of simple constant values that you may want to use throughout your implementation.
Note that you probably shouldn't store any sensitive information in here if you plan on distributing your
implementation. For sensitive data (passwords, keys, tokens, etc.), you should consider storing those elsewhere. In my
case, I'm storing sensitive information as environment variables that I access using node's `process.env.VAR_NAME`
property.
## messages.json
Store user facing messages here. This is just personal preference. I come from an iOS programming background so I'm
used to storing long, user-facing strings in a separate file that can be easily referenced in code.
## profanities.json
This should just be an array of strings that you consider inappropriate for your stream chat. I chose to keep this
empty because it should be up to the streamer to decide which words constitute bad behavior. Example of how to format:
```
[
	"cotton headed ninny muggins",
	"glip glop",
	"weenie"
]
```
My implementation of this bot will check if a message contains any of these words. If there is a match, the user that
sent the message will be timed out.
