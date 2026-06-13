import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function updateYears(): void {
    const year = new Date().getFullYear();
    
    // Update LICENSE file
    try {
        const licensePath = join(__dirname, '../../LICENSE');
        const licenseText = readFileSync(licensePath, 'utf8');
        
        const updatedLicenseText = licenseText.replace(
            /Copyright \(c\) (\d{4})(?:-\d{4})?/,
            `Copyright (c) 2018-${year}`
        );
        
        writeFileSync(licensePath, updatedLicenseText);
        console.log(`✅ Updated LICENSE year to ${year}`);
    } catch (error) {
        console.error('❌ Failed to update LICENSE:', error instanceof Error ? error.message : error);
        process.exit(1);
    }

    // Update README.md file
    try {
        const readmePath = join(__dirname, '../../README.md');
        const readmeText = readFileSync(readmePath, 'utf8');
        
        const updatedReadmeText = readmeText.replace(
            /MIT © \d{4}-\d{4} \[Farahmand Moslemi\]/,
            `MIT © 2018-${year} [Farahmand Moslemi]`
        );
        
        writeFileSync(readmePath, updatedReadmeText);
        console.log(`✅ Updated README.md year to ${year}`);
    } catch (error) {
        console.error('❌ Failed to update README.md:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

updateYears();