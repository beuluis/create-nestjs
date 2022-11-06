run-test:
	@docker-compose -f docker-compose.testing.yml up --build -d
	@npm run test:cov
	@docker-compose -f docker-compose.testing.yml down -v

# run test and coverage and log everything
run-test-verbose:
	@docker-compose -f docker-compose.testing.yml up --build -d
	@DISABLE_NEST_LOGGER=false npm run test:cov -- --verbose
	@docker-compose -f docker-compose.testing.yml down -v