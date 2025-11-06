@echo off
if exist "sitemap.xml" ( ren "sitemap.xml" "sitemap.static.xml" & echo Renamed sitemap.xml -> sitemap.static.xml ) else ( echo No sitemap.xml found. )
