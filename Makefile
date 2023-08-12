include .env

HOST_USER?=gha
WEB_USER?=www-data
dcr=docker compose run

.PHONY: helpers help

help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-10s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

helpers: ## helpers : Generate IDE helper files
	mkdir helpers || true
	@rm _ide_helper.php || true
	@rm helpers/_ide_helper_models.php || true
	@$(dcr) php php artisan ide-helper:generate
	@$(dcr) php php artisan ide-helper:models -F helpers/_ide_helper_models.php -M
