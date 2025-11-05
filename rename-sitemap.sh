#!/usr/bin/env bash
set -e
[[ -f sitemap.xml ]] && mv sitemap.xml sitemap.static.xml && echo "Renamed sitemap.xml -> sitemap.static.xml" || echo "No sitemap.xml found."
