//original https://github.com/srigar/multiselect-react-dropdown

import { $, $$, useMemo, isObservable, Observable, useEffect, type JSX } from 'woby'

import { make, useClickAway, ClickAwayWrapper } from 'use-woby'
// import CloseCircle from '../../assets/svg/closeCircle.svg'
// import CloseCircleDark from '../assets/svg/closeCircleDark.svg'
// import CloseLine from '../assets/svg/closeLine.svg'
// import CloseSquare from '../assets/svg/closeSquare.svg'
// import DownArrow from '../assets/svg/downArrow.svg'
import { SelectProps } from "./interface"
// import OutsideAlerter from './OutsideAlerter' // Import your OutsideAlerter component if needed
import '../dist/output.css'

const CloseCircle = (props: JSX.SVGAttributes<SVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" {...props}>
    <path d="M48 0a48 48 0 1 0 48 48A48.051 48.051 0 0 0 48 0Zm0 84a36 36 0 1 1 36-36 36.04 36.04 0 0 1-36 36Z" class="st0" />
    <path d="M64.242 31.758a5.998 5.998 0 0 0-8.484 0L48 39.516l-7.758-7.758a6 6 0 0 0-8.484 8.484L39.516 48l-7.758 7.758a6 6 0 1 0 8.484 8.484L48 56.484l7.758 7.758a6 6 0 0 0 8.484-8.484L56.484 48l7.758-7.758a5.998 5.998 0 0 0 0-8.484Z" class="st0" />
</svg>

const CloseCircleDark = (props: JSX.SVGAttributes<SVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" style="enable-background:new 0 0 512 512" {...props}>
    <path d="M256 33C132.3 33 32 133.3 32 257s100.3 224 224 224 224-100.3 224-224S379.7 33 256 33zm108.3 299.5c1.5 1.5 2.3 3.5 2.3 5.6 0 2.1-.8 4.2-2.3 5.6l-21.6 21.7c-1.6 1.6-3.6 2.3-5.6 2.3-2 0-4.1-.8-5.6-2.3L256 289.8l-75.4 75.7c-1.5 1.6-3.6 2.3-5.6 2.3-2 0-4.1-.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6 0-2.1.8-4.2 2.3-5.6l75.7-76-75.9-75c-3.1-3.1-3.1-8.2 0-11.3l21.6-21.7c1.5-1.5 3.5-2.3 5.6-2.3 2.1 0 4.1.8 5.6 2.3l75.7 74.7 75.7-74.7c1.5-1.5 3.5-2.3 5.6-2.3 2.1 0 4.1.8 5.6 2.3l21.6 21.7c3.1 3.1 3.1 8.2 0 11.3l-75.9 75 75.6 75.9z" style="fill:#fff" />
</svg>

const CloseLine = (props: JSX.SVGAttributes<SVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" style="enable-background:new 0 0 512 512" {...props}>
    <path d="M443.6 387.1 312.4 255.4l131.5-130c5.4-5.4 5.4-14.2 0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L256 197.8 124.9 68.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.5-9.8 4L68 105.9c-5.4 5.4-5.4 14.2 0 19.6l131.5 130L68.4 387.1c-2.6 2.6-4.1 6.1-4.1 9.8 0 3.7 1.4 7.2 4.1 9.8l37.4 37.6c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1L256 313.1l130.7 131.1c2.7 2.7 6.2 4.1 9.8 4.1 3.5 0 7.1-1.3 9.8-4.1l37.4-37.6c2.6-2.6 4.1-6.1 4.1-9.8-.1-3.6-1.6-7.1-4.2-9.7z" style="fill:#fff" />
</svg>

const CloseSquare = (props: JSX.SVGAttributes<SVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="512.001" height="512.001" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd" viewBox="0 0 13547 13547" {...props}>
    <path d="M0 0h13547v13547H0z" style="fill:none" />
    <path d="M714 12832h12118V715H714v12117zm4188-2990 1871-1871 1871 1871 1197-1197-1871-1871 1871-1871-1197-1197-1871 1871-1871-1871-1197 1197 1871 1871-1871 1871 1197 1197z" style="fill:#fff" />
</svg>


const DownArrow = (props: JSX.SVGAttributes<SVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" {...props}>
    <path fill="none" d="M0 0h32v32H0z" />
    <path d="m2.002 10 13.999 14 14.001-14z" />
</svg>


const closeIconTypes = {
    circle: CloseCircleDark,
    circle2: CloseCircle,
    close: CloseSquare,
    cancel: CloseLine
}


export const Select = (props: SelectProps): JSX.Element => {
    const {
        options = $([]),
        disablePreSelectedValues = $(false),
        selectedValues = $([]),
        isObject = $(true),
        displayValue = $("model"),
        showCheckbox = $(false),
        selectionLimit = $(-1),
        placeholder = $("Select"),
        groupBy = $(""),
        style = $({}),
        classes = $({}),
        emptyRecordMsg = $("No Options Available"),
        onSelect = () => { },
        onRemove = () => { },
        onKeyPressFn = $(() => { }),
        closeIcon = $('circle2'),
        singleSelect = $(false),
        caseSensitiveSearch = $(false),
        id = $(''),
        // name = $(''),
        closeOnSelect = $(true),
        avoidHighlightFirstOption = $(true),
        hidePlaceholder = $(false),
        showArrow = $(false),
        keepSearchTerm = $(false),
        customCloseIcon = $(''),
        className = $(''),
        customArrow = $(undefined),
        selectedValueDecorator = v => v,
        optionValueDecorator = v => v,
        onSearch,
        loading, loadingMessage = 'loading...',
        disable, hideSelectedList, } = make<SelectProps>(props, true)


    const inputValue = $("")
    const filteredOptions = $([...$$(options)])
    const unfilteredOptions = $([...$$(options)])
    const preSelectedValues = $([...$$(selectedValues)])
    const toggleOptionsList = $(false)
    const highlightOption = $($$(avoidHighlightFirstOption) ? -1 : 0)
    const groupedObject = $([])
    const closeIconType = $(closeIconTypes[$$(closeIcon)] || closeIconTypes['circle'])

    const optionTimeout = $<number>()
    const searchWrapper = $<HTMLDivElement>()
    const searchBox = $()
    const index = $(0)

    // Skipcheck flag - value will be true when the func called from on deselect anything.
    const removeSelectedValuesFromOptions = (skipCheck: boolean) => {
        if (!skipCheck && $$(groupBy))
            groupByOptions($$(options))

        if (!$$(selectedValues).length && !skipCheck)
            return

        if ($$(isObject)) {
            let optionList = $$(unfilteredOptions).filter(item => $$(selectedValues).findIndex(v => v[$$(displayValue)] === item[$$(displayValue)]) === -1 ? true : false)
            if ($$(groupBy))
                groupByOptions(optionList)


            options(optionList)
            filteredOptions(optionList)

            filterOptionsByInput()

            return
        }
        let optionList = $$(unfilteredOptions).filter(
            item => $$(selectedValues).indexOf(item) === -1
        )

        options(optionList)
        filteredOptions(optionList)
        filterOptionsByInput()

    }
    const initialSetValue = () => {
        if (!$$(showCheckbox) && !$$(singleSelect))
            removeSelectedValuesFromOptions(false)

        // if (singleSelect) {
        //   hideOnClickOutside();
        // }
        if ($$(groupBy))
            groupByOptions(options)

    }

    // const resetSelectedValues = () => {
    //     return new Promise((resolve) => {
    //         selectedValues([])
    //         preSelectedValuesselectedValues([])
    //         optionsselectedValues($$(unfilteredOptions))
    //         filteredOptionsselectedValues($$(unfilteredOptions))
    //         // @ts-ignore
    //         resolve()
    //         initialSetValue()
    //     })
    // }

    // const getSelectedItems = () => {
    //     return $$(selectedValues)
    // }

    // const getSelectedItemsCount = () => {
    //     return $$(selectedValues).length
    // }

    useEffect(() => {
        if (!$$(searchWrapper)) return
        initialSetValue()
        // @ts-ignore
        $$(searchWrapper).addEventListener("click", listenerCallback)

        return () => {
            if ($$(optionTimeout)) {
                clearTimeout($$(optionTimeout))
            }
            $$(searchWrapper)?.removeEventListener('click', listenerCallback)
        }
    })

    const listenerCallback = () => {
        // @ts-ignore
        $$(searchBox).focus()
    }

    const groupByOptions = (options) => {
        const go = $$(options).reduce(function (r, a) {
            const key = a[$$(groupBy)] || "Others"
            r[key] = r[key] || []
            r[key].push(a)
            return r
        }, Object.create({}))

        groupedObject(go)
    }

    const onChange = (event) => {
        inputValue(event.target.value)
        filterOptionsByInput()

        if (onSearch)
            onSearch(event.target.value)
    }

    const onKeyPress = (event) => {
        if (onKeyPressFn)
            onKeyPressFn(event, event.target.value)
    }

    const filterOptionsByInput = () => {
        if ($$(isObject))
            options($$(filteredOptions).filter(i => matchValues(i[$$(displayValue)], $$(inputValue))))
        else
            options($$(filteredOptions).filter(i => matchValues(i, $$(inputValue))))
        groupByOptions($$(options))
    }

    const matchValues = (value, search) => {
        if ($$(caseSensitiveSearch))
            return value.indexOf(search) > -1
        if (value.toLowerCase)
            return value.toLowerCase().indexOf(search.toLowerCase()) > -1
        return value.toString().indexOf(search) > -1
    }

    const onArrowKeyNavigation = (e) => {
        if (e.keyCode === 8 && !$$(inputValue) && !$$(disablePreSelectedValues) && $$(selectedValues).length)
            onRemoveSelectedItem($$(selectedValues).length - 1)

        if (!$$(options).length)
            return

        if (e.keyCode === 38)
            if ($$(highlightOption) > 0)
                highlightOption($$(highlightOption) - 1)
            else
                highlightOption($$(options).length - 1)
        else if (e.keyCode === 40)
            if ($$(highlightOption) < $$(options).length - 1)
                highlightOption($$(highlightOption) + 1)
            else
                highlightOption(0)
        else if (e.key === "Enter" && $$(options).length && $$(toggleOptionsList)) {
            if ($$(highlightOption) === -1)
                return

            onSelectItem($$(options)[$$(highlightOption)])
        }
        // TODO: Instead of scrollIntoView need to find better soln for scroll the dropwdown container.
        // setTimeout(() => {
        //   const element = document.querySelector("ul.optionContainer .highlight");
        //   if (element) {
        //     element.scrollIntoView();
        //   }
        // });
    }

    const onRemoveSelectedItem = (item) => {
        if ($$(isObject))
            index($$(selectedValues).findIndex(i => i[$$(displayValue)] === item[$$(displayValue)]))
        else
            index($$(selectedValues).indexOf(item))

        $$(selectedValues).splice($$(index), 1)
        selectedValues([...$$(selectedValues)])
        onRemove($$(selectedValues), item)
        // selectedValues([...$$(selectedValues)])
        if (!$$(showCheckbox)) {
            removeSelectedValuesFromOptions(true)
        }

        if (!$$(closeOnSelect)) {
            // @ts-ignore
            $$(searchBox).focus()
        }
    }

    const onSelectItem = (item) => {
        if (!$$(keepSearchTerm))
            inputValue('')

        if ($$(singleSelect)) {
            onSingleSelect(item)
            onSelect([item], item)
            return
        }
        if (isSelectedValue(item)) {
            onRemoveSelectedItem(item)
            return
        }
        if ($$(selectionLimit) == $$(selectedValues).length)
            return

        selectedValues([...$$(selectedValues), item])
        onSelect($$(selectedValues), item)
        // selectedValues([...$$(selectedValues)])
        if (!$$(showCheckbox))
            removeSelectedValuesFromOptions(true)
        else
            filterOptionsByInput()

        if (!$$(closeOnSelect)) {
            // @ts-ignore
            $$(searchBox).focus()
        }
    }

    const onSingleSelect = (item) => {
        selectedValues([item])
        toggleOptionsList(false)
    }

    const isSelectedValue = (item) => {
        if ($$(isObject)) return $$(selectedValues).filter(i => i[$$(displayValue)] === item[$$(displayValue)]).length > 0

        return $$(selectedValues).filter(i => i === item).length > 0
    }

    const renderOptionList = useMemo(() => {
        const uls = `block border rounded max-h-[250px] overflow-y-auto m-0 p-0 border-solid border-[#ccc]`
        if ($$(loading))
            return <ul className={[`optionContainer`, uls, $$(classes)['optionContainer']]} style={() => $$(style)['optionContainer']}>
                {() => typeof $$(loadingMessage) === 'string' && <span style={() => $$(style)['loadingMessage']} className={[`notFound block p-2.5`, $$(classes)['loadingMessage']]}>{loadingMessage}</span>}
                {() => typeof $$(loadingMessage) !== 'string' && $$(loadingMessage)}
            </ul>

        return <ul className={[`optionContainer`, uls, $$(classes)['optionContainer']]} style={() => $$(style)['optionContainer']}>
            {() => $$(options).length === 0 && <span style={() => $$(style)['notFound']} className={[`notFound block p-2.5`, classes]}>{$$(emptyRecordMsg)}</span>}
            {() => !$$(groupBy) ? renderNormalOption() : renderGroupByOptions()}
        </ul >
    })

    const renderGroupByOptions = () => Object.keys($$(groupedObject)).map(obj => <>
        <li className={["groupHeading",
            `p-2.5 hover:text-white hover:cursor-pointer hover:bg-[#0096fb]`,
            `text-[#908e8e] pointer-events-none px-[15px] py-[5px]`,
            $$(classes)['groupHeading']
        ]} style={$$(style)['groupHeading']}>{obj}</li>
        {$$(groupedObject)[obj].map((option, i) => {
            const isSelected = isSelectedValue(option)
            return <li style={$$(style)['option']}
                className={[`groupChildEle option ${isSelected ? 'selected' : ''} ${fadeOutSelection(option) ? 'disableSelection pointer-events-none opacity-50' : ''} ${isDisablePreSelectedValues(option) ? 'disableSelection pointer-events-none opacity-50' : ''}`,
                    `p-2.5 hover:text-white hover:cursor-pointer hover:bg-[#0096fb]`, 'pl-[30px]', $$(classes)['option']
                ]}
                onClick={() => onSelectItem(option)}
            >
                {() => $$(showCheckbox) && !$$(singleSelect) && (
                    <input
                        type="checkbox"
                        className={'checkbox mr-2.5'}
                        readOnly
                        checked={isSelected}
                    />
                )}
                {optionValueDecorator($$(isObject) ? option[$$(displayValue)] : (option || '').toString(), option)}
            </li>
        }
        )}
    </>)

    const renderNormalOption = () => $$(options).map((option, i) => {
        const isSelected = isSelectedValue(option)
        return <li
            style={$$(style)['option']}
            className={[() => `option ${isSelected ? 'selected' : ''} ${$$(highlightOption) === i ? `highlightOption highlight bg-[#0096fb] text-white` : ""} ${fadeOutSelection(option) ? 'disableSelection pointer-events-none opacity-50' : ''} ${isDisablePreSelectedValues(option) ? 'disableSelection pointer-events-none opacity-50' : ''}`,
                `p-2.5 hover:text-white hover:cursor-pointer hover:bg-[#0096fb]`, $$(classes)['option']
            ]}
            onClick={() => onSelectItem(option)}
        >
            {() => $$(showCheckbox) && !$$(singleSelect) && (
                <input
                    type="checkbox"
                    readOnly
                    className={`checkbox mr-2.5`}
                    checked={isSelected}
                />
            )}
            {optionValueDecorator($$(isObject) ? option[$$(displayValue)] : (option || '').toString(), option)}
        </li>
    })

    const renderSelectedList = useMemo(() => {
        const CloseIconType = closeIconType()
        return !$$(hideSelectedList) && $$(selectedValues).map((value, index) => (
            <span className={[`chip  ${$$(singleSelect) && 'singleChip bg-[none] text-white whitespace-nowrap rounded-[none] [&_i]:hidden'} ${isDisablePreSelectedValues(value) && 'disableSelection pointer-events-none opacity-50'}`,
                `bg-[#0096fb] inline-flex items-center text-[13px] leading-[19px] text-white whitespace-nowrap mr-[5px] px-2.5 py-1 rounded-[11px]`,
            $$(classes)['chips']
            ]} style={() => $$(style)['chips']}>
                {selectedValueDecorator(!$$(isObject) ? (value || '').toString() : value[$$(displayValue)], value)}
                {() => !isDisablePreSelectedValues(value) && (!$$(customCloseIcon) ? <CloseIconType
                    className="icon_cancel closeIcon h-[13px] w-[13px] float-right cursor-pointer ml-[5px] fill-[white]"
                    onClick={() => onRemoveSelectedItem(value)}
                /> : <i className="custom-close flex" onClick={() => onRemoveSelectedItem(value)}>{customCloseIcon}</i>)}
            </span>
        ))
    })

    const isDisablePreSelectedValues = (value) => {
        if (!$$(disablePreSelectedValues) || !$$(preSelectedValues).length)
            return false

        if ($$(isObject)) return $$(preSelectedValues).filter(i => i[$$(displayValue)] === value[$$(displayValue)]).length > 0

        return $$(preSelectedValues).filter(i => i === value).length > 0
    }

    const fadeOutSelection = (item) => {
        if ($$(singleSelect)) return

        if ($$(selectionLimit) == -1) return false

        if ($$(selectionLimit) != $$(selectedValues).length) return false

        if ($$(selectionLimit) == $$(selectedValues).length)
            if (!showCheckbox)
                return true
            else {
                if (isSelectedValue(item))
                    return false
                return true
            }
    }

    const toggelOptionList = () => {
        toggleOptionsList(!$$(toggleOptionsList))
        highlightOption($$(avoidHighlightFirstOption) ? -1 : 0)
    }

    const onCloseOptionList = () => {
        toggleOptionsList(false)
        highlightOption($$(avoidHighlightFirstOption) ? -1 : 0)
        inputValue('')
    }

    const onFocus = () => {
        if ($$(toggleOptionsList))
            clearTimeout($$(optionTimeout))
        else
            toggelOptionList()
    }

    const onBlur = () => {
        inputValue('')
        filterOptionsByInput()
        optionTimeout(setTimeout(onCloseOptionList, 250))
    }

    const isVisible = (elem: HTMLElement) => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)


    const hideOnClickOutside = () => {
        const element = document.getElementsByClassName('multiselect-container')[0]
        const outsideClickListener = event => {
            if (element && !element.contains(event.target) && isVisible(element as any))
                toggelOptionList()
        }
        document.addEventListener('click', outsideClickListener)
    }

    const renderMultiselectContainer = () =>
        <div className={[`multiselect-container multiSelectContainer ${$$(disable) ? `pointer-events-none opacity-50` : ''} ${$$(className) || ''}`,
            `box-border relative text-left w-full after:box-border before:box-border [&_*]:box-border`,
        $$(classes)['multiselectContainer']
        ]} id={$$(id) || 'multiselectContainerReact'} style={$$(style)['multiselectContainer']}>
            <div className={[`search-wrapper searchWrapper ${$$(singleSelect) ? 'singleSelect pr-5' : ''}`,
                `rounded min-h-[22px] relative p-[5px] border-solid border border-[#cccccc] flex`,
            $$(classes)['searchBox']
            ]}
                ref={searchWrapper} style={$$(style)['searchBox']}
                onClick={() => $$(singleSelect) ? $$(toggelOptionList) : () => { }}
            >
                {renderSelectedList}
                <input
                    type="text"
                    ref={searchBox}
                    className={[`searchBox ${$$(singleSelect) && $$(selectedValues).length ? 'hidden' : ''}`,
                        `bg-transparent [border:none] focus:[outline:none] flex-auto`,
                    $$(classes)['inputField']
                    ]}
                    id={`${$$(id) || 'search'}_input`}
                    // name={`${$$(name) || 'search_name'}_input`}
                    // onChange={onChange}
                    onKeyUp={onChange}
                    onKeyPress={onKeyPress}
                    value={inputValue}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={(($$(singleSelect) && $$(selectedValues).length) || ($$(hidePlaceholder) && $$(selectedValues).length)) ? '' : $$(placeholder)}
                    onKeyDown={onArrowKeyNavigation}
                    style={$$(style)['inputField']}
                    autoComplete="off"
                    disabled={() => /* $$(singleSelect) || */ $$(disable)}
                />
                {() => ($$(singleSelect) || $$(showArrow)) && (
                    <>
                        {() => $$(customArrow) ? <span className="icon_down_dir absolute -translate-y-2/4 w-3.5 right-2.5 top-2/4 before:content-['\e803']">{customArrow}</span> :
                            <DownArrow className={`icon_cancel icon_down_dir absolute translate-y-[-60%] rotate-[135deg] w-3.5 right-2.5 top-2/4 before:content-['\e803']`} />}
                    </>
                )}
            </div>
            <div
                className={[() => `optionListContainer ${$$(toggleOptionsList) ? 'block' : 'hidden'}`,
                    `absolute w-full bg-white rounded z-[2] mt-px`
                ]}

                onMouseDown={(e) => { e.preventDefault() }} >
                {renderOptionList}
            </div>
        </div>

    return <>
        <ClickAwayWrapper clickEvent={onCloseOptionList}>
            {renderMultiselectContainer()}
        </ClickAwayWrapper>
    </>
}
