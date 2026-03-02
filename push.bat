@echo off
git status > status.txt 2>&1
git push origin main > push.txt 2>&1
echo Done > done.txt
