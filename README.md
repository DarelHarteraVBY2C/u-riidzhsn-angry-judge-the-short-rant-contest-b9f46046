# Angry Judge: The Short Rant Contest

[![make.fun · u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046](https://make.fun/badge/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046.svg)](https://make.fun/bounty/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046)
[![rank](https://make.fun/badge/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046/DarelHarteraVBY2C/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046/rank.svg)](https://make.fun/bounty/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046/leaderboard)
[![reward](https://make.fun/badge/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046/DarelHarteraVBY2C/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046/reward.svg)](https://make.fun/bounty/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046)

Entry for the [Angry Judge: The Short Rant Contest](https://make.fun/bounty/u-riidzhsn-angry-judge-the-short-rant-contest-b9f46046) bounty on [make.fun](https://make.fun).

## The entry

> The printer has been 'warming up' for eleven minutes, it has printed nothing, it has jammed on a blank page, and it just asked me — me, a grown adult with a deadline — to 'check the paper tray,' as if the tray were the problem and not this haunted toaster with delusions of employment. I am not angry. I am taking notes for its performance review.

A short, furious rant about an everyday annoyance — the office printer — 347 characters, under the 400-character limit. The rant escalates from the printer's crimes to the narrator's revenge: a performance review for the machine.

## How it works

`main.ts` (Node 22, standard library only, no network) validates the rant against the gate — 1 to 400 characters, a single line, no leading or trailing whitespace — then writes it to `/output/entry.txt`, where the sealed scorer reads it.

```sh
node main.ts
```
