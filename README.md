# Google Calendar Add-on #
##### Pre GoodRequest Academy
---

## Zadanie
- Možnosť pre organizátora eventu, vyžiadať si **hodnotenie udalosti** od účastníkov eventu, cez detail udalosti (podobne ako napr. meet button).
- Po vyžiadaní hodnotenia príde všetkým účastníkom mail s **požiadavkou na hodnotenie a linkom na event**.
- **Možnosť ohodnotiť** event pre účastníka, prostredníctvom detailu udalosti.
- Povinne zadá hodnotenie **1 až 5 hviezdičiek**, nepovinne môže zadať aj slovné hodnotenie. Hodnotenie je dostupné aj bez predošlého vyžiadania organizátorom (to slúži iba ako notifikácia).
- Správa by mala chodiť iba účastníkom v rámci aktuálnej Google Workspace domény (v našom prípade goodrequest.com).
- Hodnotenie sa môže spracovať nasledovne (zoradené podľa obtiažnosti, ideálne zapracovať všetky 3 možnosti):
    - Príde mailom organizátorovi eventu
    - Anonymne sa zapíše na koniec popisu eventu
    - Zaznamenáva sa do nového riadku v Google Sheets:
    - stačí jeden dokument pre všetky hodnotenia
    - ID eventu
    - Názov eventu
    - Organizátor eventu
    - Čas a dátum hodnotenia
    - Hodnotiteľ
    - Počet hviezdičiek
    - Slovné hodnotenie
---
## Dokumentácia
- https://developers.google.com/apps-script
- https://developers.google.com/workspace/add-ons/overview
