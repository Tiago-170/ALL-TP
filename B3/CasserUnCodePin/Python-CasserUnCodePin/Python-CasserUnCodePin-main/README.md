# Python-CasserUnCodePin
```
import time
import random

start = time.time()
print("Début du programme")
code_secret = random.randint(0, 9999)

trouve = False

i = 0

while i < 10000 and not trouve:
    print(i, end=" ")

    if i == code_secret:
        trouve = True
        print(f"\nLe code est : {i}")

    i += 1

print("Fin du programme")

duree = time.time() - start

print(f"Durée du programme : {duree} secondes")
```
Le code est : 2545
Fin du programme
Durée du programme : 0.01506941223144
