import { sleep } from "./util";
import { Builder, By, ThenableWebDriver, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { promises as fs } from 'fs';


export const initDriver = async () => {
    let inited = false;
    while (!inited) {
        try {
            const options = new chrome.Options();
            options.addArguments('--headless=new');
            options.addArguments('--disable-dev-shm-usage');
            options.addArguments('--no-sandbox');
            options.addArguments('--disable-gpu');
            options.addArguments('--disable-software-rasterizer');
            options.addArguments('--disable-cache');
            options.addArguments('--disable-application-cache');
            options.addArguments('--disk-cache-size=0');
            options.addArguments('--disable-logging');
            options.addArguments('--log-level=3');
            options.addArguments('--user-data-dir=/tmp/chrome-profile');

            let driver = await new Builder()
                .forBrowser("chrome")
                .setChromeOptions(options)
                .build();
            return driver;
        } catch (err: any) {
            console.log(err);
            await sleep(10000);
        }
    }
}

export const quitDriver = async (driver: any) => {
    driver.quit();
    await sleep(10000);
    try {
        await fs.rm('/tmp/chrome-profile', { recursive: true, force: true });
    } catch (err) {
        console.log('Error cleaning up temp directory:', err);
    }
}