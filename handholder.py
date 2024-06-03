import socket
import json
from pynput.keyboard import Key, Listener

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = ('0.0.0.0', 5500) # I may need to change this. but also if I change it I also gotta change it in main.js

try:
    sock.connect(server_address)
    print('Successfully connected to server at {}:{}'.format(*server_address))
except ConnectionRefusedError:
    print('Connection to server failed: Connection refused')
    exit(1)
except Exception as e:
    print('Connection to server failed: {}'.format(e))
    exit(1)

def send_event(event_type, key):
    try:
        key_value = key.value if isinstance(key, Key) else key
        message = json.dumps({'type': event_type, 'key': key_value})
        sock.sendall(message.encode('utf-8'))
        print(f'Sent {event_type} event for key: {key}')
    except Exception as e:
        print(f'Error sending event: {e}')

def on_press(key):
    try:
        if hasattr(key, 'char'):
            key_value = key.char
        else:
            key_value = key.name 
        send_event('keydown', key_value)
    except AttributeError:
        pass
def on_release(key):
    try:
        if hasattr(key, 'char'):
            key_value = key.char
        else:
            key_value = key.name 
        send_event('keyup', key_value)
    except AttributeError:
        pass

print('Starting keyboard listener. Press ESC to stop.') # I think the ESC thing doesn't work
with Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()

print('Keyboard listener stopped')
