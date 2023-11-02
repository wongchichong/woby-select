import { render, $, type JSX } from 'woby'


import { Select } from "../src"

const words = ["Car", "Bike", "E-Bike", "Bus", "Tram", "Truck"]

export const App = () => {
    const options_ = $<String[]>(words)
    const loading = $(false)
    const handleSearch = (value) => {
        loading(true)
        const results = value ? words.filter(w => w.toLowerCase().includes(value)) : []
        setTimeout(r => { options_(r); loading(false) }, 400, results)
    }
    return <div class='w-[80%] ml-[10%]'>

        <Select
            isObject={false}
            onKeyPressFn={() => { }}
            onRemove={(selectedList: any, selectedItem: any) => { console.log(selectedList, selectedItem) }}
            onSearch={() => { }}
            onSelect={(selectedList: any, selectedItem: any) => { console.log(selectedList, selectedItem) }}
            options={[
                'Option 1',
                'Option 2',
                'Option 3',
                'Option 4',
                'Option 5'
            ]}
        />

        <h1>Array Of Objects</h1>
        <Select
            displayValue="key"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
        />

        <h1>Selected Value Decorator</h1>
        <Select
            displayValue="key"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 0 is extremely long and therefore should probably be shortened once selected as a value'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
            selectedValueDecorator={(v: string, option: any) => v?.length > 15 ? v?.substring(0, 15) + "..." : v}
        />

        <h1>Option Value Decorator</h1>
        <Select
            displayValue="key"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            optionValueDecorator={(v: string, option: any) => v?.toUpperCase()}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
        />

        <h1>Preselected Values</h1>
        <Select
            displayValue="key"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
            selectedValues={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                }
            ]}
        />

        <h1>Disable Preselected Values
        </h1>
        <Select
            disablePreSelectedValues
            displayValue="key"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
            selectedValues={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                }
            ]}
        />

        <h1>Show Checkbox</h1>
        <Select
            displayValue="key"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
            showCheckbox
        />
        <h1>Hide Selected List</h1>
        <Select
            displayValue="key"
            hideSelectedList
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
            showCheckbox
        />

        <h1>Grouping</h1>
        <Select
            displayValue="key"
            groupBy="cat"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
            showCheckbox
        />

        <h1>Selection Limit</h1>
        <Select
            displayValue="key"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
            selectionLimit={2}
        />

        <h1>Normal Single Select</h1>
        <Select
            displayValue="key"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
            singleSelect
        />

        <h1>Custom Placeholder</h1>
        <Select
            displayValue="key"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
            placeholder="Custom Placeholder"
        />

        <h1>Css Customization</h1>
        <Select
            displayValue="key"
            id="css_custom"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
            placeholder="CSS Custom"
            style={{
                chips: {
                    background: 'red'
                },
                multiselectContainer: {
                    color: 'red'
                },
            }}
            classes={{
                searchBox: `rounded-none border-b-[blue] [border:none] border-b border-solid`
            }}
        />

        <h1>Custom Close Icon</h1>
        <Select
            customCloseIcon={<>🍑</>}
            displayValue="key"
            onKeyPressFn={() => { }}
            onRemove={() => { }}
            onSearch={() => { }}
            onSelect={() => { }}
            options={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 3'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 4'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 5'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 6'
                },
                {
                    cat: 'Group 2',
                    key: 'Option 7'
                }
            ]}
            selectedValues={[
                {
                    cat: 'Group 1',
                    key: 'Option 1'
                },
                {
                    cat: 'Group 1',
                    key: 'Option 2'
                }
            ]}
        />

        <Select
            options={options_}
            onSearch={handleSearch}
            loading={loading}
            isObject={false}
            showCheckbox showArrow
        />
    </div>
}

render(<App />, document.getElementById('app'))