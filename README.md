# onionfile

Simple file sharing over tor hidden services (v3).

No need to pre-install tor, everything is packaged in.

## Using

Use via [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) (built-in with npm 5.2.0+):

    $ npx onionfile ~/shareme.txt

    http://guy9ocyi3hac5j7kh3ua336qr4t5k6q35ncyxbsrajp3smc4yp7gxtyd.onion

That's it! Share the URL with the recipient to give her access to `~/shareme.txt`.

Note: it might take a minute for the hidden service to become available.

## Installing

Instead of using `npx`, you may install the package locally to make it available simply as `onionfile`:

    $ npm install -g onionfile

    $ onionfile ~/shareme.txt


## Why?

- Share files easily and privately.

- Doesn't require accepting incoming connections, no port forwarding needed.

- Self-authenticating URLs, in both directions:
  the URL is required in order to access the file (serving as an access key),
  and it authenticates the identify of the server (protecting against MITM attacks).

## Thanks

To [Dead Canaries](http://deadcanaries.gitlab.io/)'s awesome
[granax](https://gitlab.com/deadcanaries/granax) and [hsv3](https://gitlab.com/deadcanaries/hsv3) libraries,
which made writing this utility a breeze (<20 LoC)!

## License

MIT
