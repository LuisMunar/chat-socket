# ChatSocket

## Requirements documentation
- `@stomp/stompjs - https://www.npmjs.com/package/@stomp/stompjs?activeTab=versions`
- `sockjs-client - https://www.npmjs.com/package/sockjs-client`
- `@types/sockjs-client`

## NOTES:
- If you get the error `global is not defined`, you need add the next script in the html project root (index.html) on the head tag
  - `
    <script>
      var global = global || window;
    </script>
  `
