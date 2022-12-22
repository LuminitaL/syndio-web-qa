import { AppChainers } from "../common/chainers";
import { AppData } from "../common/data";
import { AppLocators } from "../common/locators"
import { AppPage } from "../common/page-objects";

describe('E2E: Dashboard', () => {
    const appPage = new AppPage();

    beforeEach(() => {
        appPage.visit();
        
        appPage.intercept(AppData.groupByFunctionPath, AppData.groupByFunctionAlias);
        appPage.intercept(AppData.groupByRolePath, AppData.groupByRoleAlias);
    });

    it("Dashboard: change group by selecting dropdown options", () => {
        appPage.should(AppLocators.dropdownButton, AppChainers.toHaveText, AppData.groupByFunctionLabel) ;

        appPage.wait(`@${AppData.groupByFunctionAlias}`).then(({ response }) => {
            expect(response.statusCode).to.eq(200);
           
            appPage.childShould(AppLocators.payEquityGapChildrens, 0, AppChainers.toHaveText, response.body.data.gender.payEquityGap.data.minority.value);
            appPage.childShould(AppLocators.payEquityGapChildrens, 1, AppChainers.toHaveText, response.body.data.gender.payEquityGap.data.majority.value);
            appPage.childShould(AppLocators.employeeComparison, 0, AppChainers.toHaveText, response.body.data.gender.employeeComparison.data.value);
            appPage.childShould(AppLocators.budget, 0, AppChainers.toHaveText, response.body.data.gender.budget.data.value);

            appPage.click(AppLocators.raceTab);
            appPage.childShould(AppLocators.payEquityGapChildrens, 0, AppChainers.toHaveText, response.body.data.race.payEquityGap.data.minority.value);
            appPage.childShould(AppLocators.payEquityGapChildrens, 1, AppChainers.toHaveText, response.body.data.race.payEquityGap.data.majority.value);
            appPage.childShould(AppLocators.employeeComparison, 0, AppChainers.toHaveText, response.body.data.race.employeeComparison.data.value);
            appPage.childShould(AppLocators.budget, 0, AppChainers.toHaveText, response.body.data.race.budget.data.value);
        });

        appPage.click(AppLocators.headerDropdown);
        appPage.shouldContain(AppLocators.dropdownOptions, AppData.groupByFunctionLabel, AppChainers.toHaveClass, AppData.disabled);
        appPage.clickAndContain(AppLocators.dropdownOptions, AppData.groupByRoleLabel);
        appPage.should(AppLocators.dropdownButton, AppChainers.toHaveText, AppData.groupByRoleLabel);

        appPage.wait(`@${AppData.groupByRoleAlias}`).then(({ response }) => {
            expect(response.statusCode).to.eq(200);
           
            appPage.childShould(AppLocators.payEquityGapChildrens, 0, AppChainers.toHaveText, response.body.data.gender.payEquityGap.data.minority.value);
            appPage.childShould(AppLocators.payEquityGapChildrens, 1, AppChainers.toHaveText, response.body.data.gender.payEquityGap.data.majority.value);
            appPage.childShould(AppLocators.employeeComparison, 0, AppChainers.toHaveText,  response.body.data.gender.employeeComparison.data.value);
            appPage.childShould(AppLocators.budget, 0, AppChainers.toHaveText, response.body.data.gender.budget.data.value);

            appPage.click(AppLocators.raceTab);
            appPage.childShould(AppLocators.payEquityGapChildrens, 0, AppChainers.toHaveText, response.body.data.race.payEquityGap.data.minority.value);
            appPage.childShould(AppLocators.payEquityGapChildrens, 1, AppChainers.toHaveText, response.body.data.race.payEquityGap.data.majority.value);
            appPage.childShould(AppLocators.employeeComparison, 0, AppChainers.toHaveText,  response.body.data.race.employeeComparison.data.value);
            appPage.childShould(AppLocators.budget, 0, AppChainers.toHaveText, response.body.data.race.budget.data.value);
        });
    });
});
