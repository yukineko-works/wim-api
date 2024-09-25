import Ajv from 'ajv'
const ajv = new Ajv({ allErrors: true, strict: true })

addSchema('1', './schema/rev1.json')

async function addSchema(rev: string, path: string) {
    const schema = await import(path, { assert: { type: 'json' } })
    ajv.addSchema('default' in schema && !('$ref' in schema) ? schema.default : schema, rev)
}

export async function validate(rev: string, data: unknown): Promise<{ success: boolean, message: string }> {
    const validator = ajv.getSchema(rev)
    if (validator == null) {
        return {
            success: false,
            message: 'Invalid revision number'
        }
    }

    const valid = validator(data)
    if (!valid) {
        return {
            success: false,
            message: 'Validation failed: ' + ajv.errorsText(validator.errors)
        }
    }

    return {
        success: true,
        message: 'Validation successful'
    }
}